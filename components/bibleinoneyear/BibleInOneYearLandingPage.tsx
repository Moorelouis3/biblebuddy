"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { getLandingSessionId, markShareLandingClick } from "@/lib/shareLandingReferral";
import PaperbackStrip from "@/components/devotionals/PaperbackStrip";

/**
 * The shareable entry page for Bible in One Year (2026-10-25).
 *
 * Every study has had one of these for months - Proverbs, Higher Hope, the
 * Tempting of Jesus - and the biggest thing in the app did not (Louis: "now
 * the bible in one year needs to behave like the other devotionals"). There
 * was nowhere to send somebody who is not signed in: /reading-plans/
 * bible-in-one-year is the plan itself and bounces a stranger to the login
 * wall with no idea what they were being asked to sign up for.
 *
 * Modelled on components/higherhope/HigherHopeLandingPage.tsx, which is itself
 * modelled on the Proverbs one, so the three read as the same family.
 *
 * Two differences, both because this is a reading plan and not a devotional:
 *
 *  1. **It lives at /bible-in-one-year, not under /devotionals/.** There is no
 *     devotionals row for it - it has its own tables and its own plan page -
 *     so filing it under devotionals would be a lie in the URL. Short is also
 *     better for the thing most likely to be shared.
 *  2. **The paperback link comes from a constant here, not from the database.**
 *     scripts/link-printed-edition.mjs sets devotionals.paperback_url, and
 *     there is no row to set. See PAPERBACK_URL below.
 */

const PAGE_PATH = "/bible-in-one-year";
const PLAN_PATH = "/reading-plans/bible-in-one-year";

/**
 * The printed edition, once it exists.
 *
 * Both formats were submitted to KDP on 2026-10-24 and Amazon's review takes
 * up to 72 hours, so there is no ASIN yet and nothing to link to - a guessed
 * URL would be a dead link on a live page. The strip below renders nothing
 * while this is null, exactly as it does for a study with no paperback.
 *
 * When the Live email arrives, put the URL here in the same shape the other
 * books use: https://www.amazon.com/dp/<ASIN>
 * See docs/amazon/bible-in-one-year/upload-instructions.md.
 */
const PAPERBACK_URL: string | null = null;

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
        metadata: { study: "bible-in-one-year", signed_in: Boolean(userId), ...extra },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics never blocks the page.
  }
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

export default function BibleInOneYearLandingPage() {
  const { userId, loading: authLoading } = useSupabaseUser();

  const startHref = userId ? PLAN_PATH : `/signup?next=${encodeURIComponent(PLAN_PATH)}`;
  const ctaLabel = userId ? "Open the plan" : "Start Day 1 — it is free";

  const handleStartClick = (placement: string) => {
    markShareLandingClick(PAGE_PATH, placement);
    track("bible_year_start_click", userId ?? null, { placement, destination: startHref });
  };

  const viewTracked = useRef(false);
  useEffect(() => {
    if (authLoading || viewTracked.current) return;
    viewTracked.current = true;
    track("bible_year_page_view", userId ?? null);
  }, [authLoading, userId]);

  const whatItIs = [
    {
      emoji: "📖",
      text: "The whole Bible, Genesis to Revelation, in 365 days. A manageable amount each day rather than a wall of chapters.",
    },
    {
      emoji: "🧭",
      text: "You are never dropped into a chapter cold. Every day comes with study notes that explain what you are reading and why it is there.",
    },
    {
      emoji: "🔓",
      text: "Start today, or in March. Nothing is locked, nothing expires, and the plan does not care what the calendar says.",
    },
    {
      emoji: "🔁",
      text: "Miss a week and you pick up where you left off. There is no streak to break and nothing resets.",
    },
    {
      emoji: "💷",
      text: "Free. No card, no trial, no upgrade screen waiting at day 30.",
    },
  ];

  const dailySteps = [
    {
      emoji: "📜",
      title: "Read the day's passage",
      text: "A few chapters, with the text right there — no hunting for your place.",
    },
    {
      emoji: "🧠",
      title: "Read the study notes",
      text: "What is happening, who these people are, and what the chapter is actually doing. Written for someone reading it for the first time.",
    },
    {
      emoji: "🎧",
      title: "Or listen instead",
      text: "Most days have a narrated version, for the mornings when reading is not going to happen.",
    },
    {
      emoji: "✍️",
      title: "Answer one question",
      text: "One reflection question, saved privately to your account. Then a short quiz if you want to check what stuck.",
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
        Free forever · No card · A Bible Buddy account keeps your place
      </p>
      {!userId && !authLoading ? (
        <p className="mt-2 text-sm text-[#5b6c84]">
          Already have an account?{" "}
          <Link href={`/login?next=${encodeURIComponent(PLAN_PATH)}`} className="font-semibold text-[#2f6fd0] underline">
            Sign in
          </Link>
        </p>
      ) : null}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eef4fd] via-[#f7faff] to-white">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-6 sm:pt-10">
        <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl border border-[#dce7f7] bg-white shadow-sm">
          <Image
            src="/bible-in-one-year-cover.png"
            alt="Bible in One Year — a 365-day journey through God's word, from Bible Buddy"
            width={1024}
            height={1536}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e4f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3f7a46]">
            ✓ Free · 365 Days · Your own pace
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#10213a] sm:text-[2.6rem]">
            Read the whole Bible.
            <br />
            One year, one day at a time.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#44566f]">
            Most people who set out to read the Bible stop somewhere in Leviticus. Not because they
            stopped caring, but because nobody told them what they were reading. This plan gives you
            the day&rsquo;s passage and the notes that explain it, together, every morning.
          </p>
        </div>

        <div className="mt-8">{cta}</div>

        <div className="mt-10 space-y-4">
          <Section
            emoji="📖"
            title="How this plan works"
            subtitle="Free, self-paced, and explained as you go"
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
              About fifteen minutes. Every day is open from the start — go faster or slower than the
              calendar, it makes no difference to the plan.
            </p>
          </Section>

          <Section emoji="🗺️" title="What the year covers" subtitle="Genesis to Revelation, in order">
            <ol className="space-y-3 text-[15px] leading-relaxed text-[#2c3e55]">
              <li>
                <strong>The beginning.</strong> Creation, the flood, Abraham&rsquo;s family, and how a
                nation starts with one promise.
              </li>
              <li>
                <strong>Out of Egypt, into the law.</strong> Moses, the exodus, and the parts most
                people give up on — with the notes that make them make sense.
              </li>
              <li>
                <strong>Kings, prophets and exile.</strong> David, Solomon, the long decline, and the
                prophets nobody listened to.
              </li>
              <li>
                <strong>Poetry and wisdom.</strong> Psalms, Proverbs, Job and Ecclesiastes, spread
                through the year rather than endured in one block.
              </li>
              <li>
                <strong>The Gospels.</strong> Jesus, four times over, each account doing something the
                others do not.
              </li>
              <li>
                <strong>The church, and the end.</strong> Acts, the letters, and Revelation — which
                turns out to be less strange once you have read everything leading to it.
              </li>
            </ol>
          </Section>

          <Section emoji="❓" title="Will I actually finish?" subtitle="An honest answer">
            <div className="space-y-4 text-[15px] leading-relaxed text-[#2c3e55]">
              <p>
                Maybe not in exactly 365 days, and that is fine. The plan is built so that falling
                behind costs you nothing — there is no catch-up pile, no red marks, no streak to lose.
                Your place is saved and waits for you.
              </p>
              <p>
                What stops most people is not willpower, it is bewilderment: twelve chapters into a
                genealogy with nobody explaining why it is there. That is the part this fixes.
              </p>
              <p>
                You can read it on your phone on the train, or at a desk. You can listen on most days
                instead of reading. And you can start at day one in the middle of July if that is when
                you are ready.
              </p>
            </div>
          </Section>
        </div>

        {/* Renders nothing until PAPERBACK_URL is set - the book is still in
            Amazon's review queue. */}
        <div className="mt-10">
          <PaperbackStrip href={PAPERBACK_URL} title="Bible in One Year" />
        </div>

        <div className="mt-10 rounded-3xl bg-[#10213a] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">A year from now</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#b9cbe4]">
            you will have read the book you have been meaning to read your whole life — not skimmed
            it, not started it again, read it. The year is going to pass anyway.
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
            <p className="mt-3 text-sm text-[#8ea7c6]">Free · No card · Start on whatever day you like</p>
          </div>
        </div>
      </div>
    </main>
  );
}
