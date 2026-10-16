"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { getLandingSessionId, markShareLandingClick } from "@/lib/shareLandingReferral";

/**
 * The permanent, shareable entry page for The Tempting of Jesus.
 *
 * Built 2026-10-16, the day the 21 days were rebased on the second edition of
 * the book. Until now this study had no public door at all: /devotionals/<id> is
 * a client component behind auth, so a signed-out visitor was bounced to the
 * homepage and the link preview was the generic site card.
 *
 * Shape copied from components/proverbs/ProverbsLandingPage.tsx, with one
 * deliberate difference: that page renders a joined-count and member faces from
 * lib/communityEvents.ts, and there is no community event for this study. Rather
 * than invent numbers, this page simply has no social-proof block. Same rule as
 * the Proverbs page: everything shown here is real.
 */

const DEVOTIONAL_ID = "86cc0f5e-5414-4691-8348-6a91c9354bde";
const PAGE_PATH = "/devotionals/tempting-of-jesus";

/** Same shape as the Proverbs page so a view here and the signup after it join on one id. */
function track(eventName: string, userId: string | null, extra: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        session_id: getLandingSessionId(),
        user_id: userId,
        source: "share_link",
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        metadata: { devotional_id: DEVOTIONAL_ID, signed_in: Boolean(userId), ...extra },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics never blocks the page.
  }
}

/** One collapsible section. Open by default on the first one so the page never looks empty. */
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
        <span
          aria-hidden
          className={`shrink-0 text-xl text-[#2f6fd0] transition-transform ${open ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </button>
      {open ? <div className="border-t border-[#eaf1fb] px-5 pb-7 pt-5 sm:px-7">{children}</div> : null}
    </div>
  );
}

export default function TemptingLandingPage() {
  const { userId, loading: authLoading } = useSupabaseUser();

  const studyPath = `/devotionals/${DEVOTIONAL_ID}`;
  // Carry the destination through signup so they land in the study, not a dashboard.
  // Both /signup and /login honour ?next=.
  const startHref = userId ? studyPath : `/signup?next=${encodeURIComponent(studyPath)}`;
  const ctaLabel = userId ? "Open the study" : "Start the Free 21-Day Study";

  const handleStartClick = (placement: string) => {
    markShareLandingClick(PAGE_PATH, placement);
    track("tempting_share_start_click", userId ?? null, { placement, destination: startHref });
  };

  const viewTracked = useRef(false);

  useEffect(() => {
    if (authLoading || viewTracked.current) return;
    viewTracked.current = true;
    track("tempting_share_page_view", userId ?? null);
  }, [authLoading, userId]);

  // What this actually is, before what you do each day. People arriving from a
  // social post assume a Zoom class or a mailing list, so say plainly it is neither.
  const whatItIs = [
    { emoji: "📱", text: "It all happens inside Bible Buddy, on your phone or your computer. No Zoom, no video calls, no meetings to show up to." },
    { emoji: "📅", text: "21 days, one a day — the whole wilderness story, start to finish." },
    { emoji: "⏱️", text: "About thirty minutes a day, whenever suits you. Morning, lunch break, last thing at night." },
    { emoji: "🔓", text: "All 21 days are open from the start. Begin today or next month, go fast or slow. Nothing locks and nothing expires." },
    { emoji: "💾", text: "Your place and your answers save as you go, so you can stop mid-day and pick it back up on any device." },
  ];

  const dailySteps = [
    { emoji: "🎧", title: "Read or listen", text: "The day's study — read it, or let Bible Buddy read it to you." },
    { emoji: "📜", title: "Read the passage", text: "The actual Scripture for that day, with study notes beside the text. Every day tells you what to watch for before you read." },
    { emoji: "💬", title: "Sit with the question", text: "One question that is hard to dodge, about your own life and not somebody else's." },
    { emoji: "✍️", title: "Do the one thing, then pray", text: "Every day ends with one small, concrete action you can actually check off, and a prayer to close it." },
  ];

  // The book's own four parts, so a visitor can see the shape of the 21 days.
  const parts = [
    {
      label: "Know the Enemy",
      days: "Days 1–4",
      text: "The three tricks the devil has run since the garden, why following God made the fight louder, and the five steps temptation walks you down every time.",
    },
    {
      label: "The Preparation",
      days: "Days 5–10",
      text: "How Jesus got ready: the temple at twelve, eighteen hidden years in Nazareth, John the Baptist, the water, the Father's voice, and the Spirit leading Him into the desert.",
    },
    {
      label: "The Showdown",
      days: "Days 11–18",
      text: "All three temptations, one at a time — and every Old Testament passage Jesus quoted back, read in the place it came from.",
    },
    {
      label: "The Victory",
      days: "Days 19–21",
      text: "The five steps Jesus used to fight, the armor God hands you, and the promise that there is a way out of every single temptation.",
    },
  ];

  const cta = (
    <div className="text-center">
      <Link
        href={startHref}
        onClick={() => handleStartClick("hero")}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2f6fd0] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#2f6fd0]/25 transition hover:bg-[#2559ab] sm:w-auto sm:text-lg"
      >
        <span aria-hidden>📖</span>
        {ctaLabel}
      </Link>
      <p className="mt-3 text-sm text-[#5b6c84]">
        Free forever · A Bible Buddy account saves your place and your answers
      </p>
      {!userId && !authLoading ? (
        <p className="mt-2 text-sm text-[#5b6c84]">
          Already have an account?{" "}
          <Link href={`/login?next=${encodeURIComponent(studyPath)}`} className="font-semibold text-[#2f6fd0] underline">
            Sign in
          </Link>
        </p>
      ) : null}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eef4fd] via-[#f7faff] to-white">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-6 sm:pt-10">
        <div className="overflow-hidden rounded-3xl border border-[#dce7f7] bg-white shadow-sm">
          <Image
            src="/og/tempting-of-jesus.png"
            alt="The Tempting of Jesus — a free 21-day Bible study from Bible Buddy"
            width={1200}
            height={630}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e4f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3f7a46]">
            ✓ Free · 21 Days · Your own pace
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#10213a] sm:text-[2.6rem]">
            Fight temptation
            <br />
            the way Jesus did.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#44566f]">
            Most people fight temptation blind, lose the same fight for years, and quietly wonder what is wrong
            with them. Jesus faced the devil himself in the wilderness and beat every trick he had. This study
            walks through exactly how He did it.
          </p>
        </div>

        <div className="mt-8">{cta}</div>

        <div className="mt-10">
          <Section
            emoji="📖"
            title="How this Bible study works"
            subtitle="Digital, self-paced, and free — here is exactly what happens"
            defaultOpen
          >
            <ul className="space-y-4">
              {whatItIs.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 text-lg">
                    {item.emoji}
                  </span>
                  <span className="text-[15px] leading-relaxed text-[#2c3e55]">{item.text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.1em] text-[#5b6c84]">
              What a day looks like
            </p>
            <ol className="mt-4 space-y-4">
              {dailySteps.map((step, index) => (
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

            <p className="mt-6 rounded-2xl bg-[#f3f8ff] px-4 py-3 text-sm font-medium text-[#2c3e55]">
              All 21 days are open. Go at your own pace, one day at a time.
            </p>
          </Section>
        </div>

        <div className="mt-5">
          <Section
            emoji="🗺️"
            title="What the 21 days cover"
            subtitle="The study moves in four parts, in the order the story happens"
          >
            <ol className="space-y-5">
              {parts.map((part) => (
                <li key={part.label}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-base font-bold text-[#10213a]">{part.label}</span>
                    <span className="rounded-full bg-[#eaf1fd] px-2.5 py-0.5 text-xs font-bold text-[#2f6fd0]">
                      {part.days}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#44566f]">{part.text}</p>
                </li>
              ))}
            </ol>
          </Section>
        </div>

        <div className="mt-10 rounded-3xl bg-[#10213a] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Twenty-one days from now</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#b9cbe4]">
            you will know the enemy&rsquo;s three tricks by name, you will know the five steps he walks you down,
            and you will have the same blueprint Jesus used to beat all of it.
          </p>
          <div className="mt-7">
            <Link
              href={startHref}
              onClick={() => handleStartClick("closing")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#10213a] transition hover:bg-[#eef4fd] sm:w-auto sm:text-lg"
            >
              <span aria-hidden>📖</span>
              {ctaLabel}
            </Link>
            <p className="mt-3 text-sm text-[#8ea7c6]">Free · No card · Start today</p>
          </div>
        </div>
      </div>
    </main>
  );
}
