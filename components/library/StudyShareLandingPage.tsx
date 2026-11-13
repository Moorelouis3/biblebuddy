"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { getLandingSessionId, markShareLandingClick } from "@/lib/shareLandingReferral";

/**
 * The shareable entry page for a study, driven by a config object.
 *
 * WHICH ONE IS AUTHORITATIVE. There are three older pages of this kind, each a
 * whole component written out by hand: components/higherhope/
 * HigherHopeLandingPage.tsx, components/proverbs/ProverbsLandingPage.tsx and
 * components/beginning/BeginningOfEverythingLandingPage.tsx. They are live and
 * linked from emails that have already gone out, so they were left alone
 * (2026-11-13) rather than rewritten for no visible gain. This is the one a
 * NEW study should use: The Obedience of Abraham is the first, and the next
 * study is a config object in app/devotionals/<slug>/page.tsx, not a fourth
 * copy of 390 lines.
 *
 * Two things the hand-written pages got wrong that this cannot:
 *  - the opening date is said in one place and every sentence is built from
 *    it. The Beginning page moved from 1 to 8 November and two of its lines
 *    still say the 1st.
 *  - its analytics events are generic (study_landing_*, with the study in the
 *    metadata), so a new page does not need a new entry in the allowlist in
 *    app/api/landing-analytics/route.ts. Higher Hope shipped without its
 *    entries and went unmeasured, silently, because the tracker swallows the
 *    400.
 */

export type StudyShareLandingConfig = {
  /** Short key for analytics, e.g. "obedience-of-abraham". */
  study: string;
  /** This page's own path, e.g. /devotionals/obedience-of-abraham. */
  pagePath: string;
  /** Where a reader goes once the study is open: /devotionals/<id>. */
  studyPath: string;
  /** Where "save my place" goes before it opens, usually the /events sign-up. */
  beforeOpenPath: string;
  /** Matches devotionals.available_from, YYYY-MM-DD. The reader is gated by the row, not by this. */
  opensOn: string;
  title: string;
  totalDays: number;
  /** "Genesis 11–25" - used in the badge. */
  passageLabel: string;
  /** The book cover, portrait, as on every other study page. */
  art: { src: string; width: number; height: number; alt: string };
  headline: string[];
  lead: string;
  howItWorks: Array<{ emoji: string; text: string }>;
  dailySteps: Array<{ emoji: string; title: string; text: string }>;
  coverage: { title: string; subtitle: string; items: Array<{ label: string; text: string }> };
  questions: Array<{ question: string; answer: string }>;
  closing: { heading: string; text: string };
};

/** "1 December" from 2026-12-01. No year: see lib/studyLibrary.ts for why. */
function dayAndMonth(isoDate: string) {
  const [, m, d] = isoDate.split("-").map(Number);
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m - 1];
  return `${d} ${month}`;
}

function hasOpened(opensOn: string) {
  // Compare dates, not instants: the study opens on that date wherever you are.
  return new Date().toISOString().slice(0, 10) >= opensOn;
}

function Section({
  emoji,
  title,
  subtitle,
  defaultOpen = false,
  children,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-3xl border border-[#dce7f7] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-[#f7faff] sm:px-7"
      >
        <span aria-hidden className="text-2xl">
          {emoji}
        </span>
        <span className="flex-1">
          <span className="block text-lg font-bold text-[#10213a] sm:text-xl">{title}</span>
          <span className="mt-0.5 block text-sm text-[#5b6c84]">{subtitle}</span>
        </span>
        <span aria-hidden className={`shrink-0 text-xl text-[#2f6fd0] transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>
      {open ? <div className="border-t border-[#eaf1fb] px-5 pb-7 pt-5 sm:px-7">{children}</div> : null}
    </div>
  );
}

export default function StudyShareLandingPage({ config }: { config: StudyShareLandingConfig }) {
  const { userId, loading: authLoading } = useSupabaseUser();
  const [open] = useState(() => hasOpened(config.opensOn));
  const opensLabel = dayAndMonth(config.opensOn);

  const destination = open ? config.studyPath : config.beforeOpenPath;
  const startHref = userId ? destination : `/signup?next=${encodeURIComponent(destination)}`;
  const ctaLabel = open
    ? userId
      ? "Open the study"
      : "Start Day 1 — it is free"
    : userId
      ? `Save my place — opens ${opensLabel}`
      : "Save my place — it is free";

  const track = (eventName: string, extra: Record<string, unknown> = {}) => {
    try {
      void fetch("/api/landing-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: eventName,
          session_id: getLandingSessionId(),
          user_id: userId ?? null,
          source: "share_link",
          page_path: window.location.pathname,
          referrer: document.referrer || null,
          metadata: { study: config.study, signed_in: Boolean(userId), opened: open, ...extra },
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Analytics never blocks the page.
    }
  };

  const handleStartClick = (placement: string) => {
    markShareLandingClick(config.pagePath, placement);
    track("study_landing_start_click", { placement, destination: startHref });
  };

  const viewTracked = useRef(false);
  useEffect(() => {
    if (authLoading || viewTracked.current) return;
    viewTracked.current = true;
    track("study_landing_page_view");
    // track closes over userId and open, both settled once authLoading is false.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eef4fd] via-[#f7faff] to-white">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-6 sm:pt-10">
        <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl border border-[#dce7f7] bg-white shadow-sm">
          <Image
            src={config.art.src}
            alt={config.art.alt}
            width={config.art.width}
            height={config.art.height}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e4f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3f7a46]">
            {open
              ? `✓ Free · ${config.totalDays} Days · ${config.passageLabel}`
              : `Opens ${opensLabel} · Free · ${config.totalDays} Days`}
          </span>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-[#5b6c84]">{config.title}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-[#10213a] sm:text-[2.6rem]">
            {config.headline.map((line, index) => (
              <span key={line} className="block">
                {line}
                {index < config.headline.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#44566f]">{config.lead}</p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href={startHref}
            onClick={() => handleStartClick("hero")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2f6fd0] px-8 py-4 text-base font-bold shadow-lg shadow-[#2f6fd0]/25 transition hover:bg-[#2559ab] sm:w-auto sm:text-lg"
            // An inline colour, not text-white: an unlayered a{color:inherit}
            // in the global stylesheet beats the Tailwind class on a link.
            style={{ color: "#ffffff" }}
          >
            <span aria-hidden>📖</span>
            {ctaLabel}
          </Link>
          <p className="mt-3 text-sm text-[#5b6c84]">
            {open
              ? "Free forever · No card · A Bible Buddy account keeps your place private to you"
              : `Free forever · No card · Sign up now and Day 1 is waiting on ${opensLabel}`}
          </p>
          {!userId && !authLoading ? (
            <p className="mt-2 text-sm text-[#5b6c84]">
              Already have an account?{" "}
              <Link
                href={`/login?next=${encodeURIComponent(destination)}`}
                className="font-semibold underline"
                style={{ color: "#2f6fd0" }}
              >
                Sign in
              </Link>
            </p>
          ) : null}
        </div>

        <div className="mt-10 space-y-4">
          <Section emoji="📖" title="How this study works" subtitle="Free and written for beginners" defaultOpen>
            <ul className="space-y-4">
              {config.howItWorks.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 text-lg">
                    {item.emoji}
                  </span>
                  <span className="text-[15px] leading-relaxed text-[#2c3e55]">{item.text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.1em] text-[#5b6c84]">What a day looks like</p>
            <ol className="mt-4 space-y-4">
              {config.dailySteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf1fd] text-sm font-bold text-[#2f6fd0]">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-[#10213a]">
                      <span aria-hidden className="mr-1.5">
                        {step.emoji}
                      </span>
                      {step.title}
                    </span>
                    <span className="mt-0.5 block text-[15px] leading-relaxed text-[#44566f]">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          <Section emoji="🧭" title={config.coverage.title} subtitle={config.coverage.subtitle}>
            <ol className="space-y-3 text-[15px] leading-relaxed text-[#2c3e55]">
              {config.coverage.items.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> {item.text}
                </li>
              ))}
            </ol>
          </Section>

          <Section emoji="❓" title="Common questions" subtitle="Before you start">
            <div className="space-y-4 text-[15px] leading-relaxed text-[#2c3e55]">
              {config.questions.map((item) => (
                <p key={item.question}>
                  <strong>{item.question}</strong> {item.answer}
                </p>
              ))}
            </div>
          </Section>
        </div>

        <div className="mt-10 rounded-3xl bg-[#10213a] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {open ? config.closing.heading : `It opens on ${opensLabel}`}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#b9cbe4]">{config.closing.text}</p>
          <div className="mt-7">
            <Link
              href={startHref}
              onClick={() => handleStartClick("closing")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold transition hover:bg-[#eef4fd] sm:w-auto sm:text-lg"
              style={{ color: "#10213a" }}
            >
              <span aria-hidden>📖</span>
              {ctaLabel}
            </Link>
            <p className="mt-3 text-sm text-[#8ea7c6]">Free · No card · {config.totalDays} days</p>
          </div>
        </div>
      </div>
    </main>
  );
}
