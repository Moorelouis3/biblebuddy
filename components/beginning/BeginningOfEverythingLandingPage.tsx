"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { getLandingSessionId, markShareLandingClick } from "@/lib/shareLandingReferral";

/**
 * The shareable entry page for The Beginning of Everything (2026-10-25).
 *
 * Modelled on components/higherhope/HigherHopeLandingPage.tsx, with two
 * differences that matter:
 *
 *  1. **It opens on 8 November, and the page says so.** The row's
 *     available_from is 2026-11-08 - moved out a week from the 1st on
 *     2026-10-28, to give people longer to join - so until then the CTA is "save my
 *     place", not "start day 1". The date is read from one constant below
 *     rather than hard coded into the copy in four places, and the page
 *     switches itself over on the day - nobody has to remember to edit it.
 *  2. **It sells the book.** Louis asked for the printed edition on this page.
 *     The link is not hard coded: it is read from devotionals.paperback_url,
 *     which is null until Amazon issues the ASIN and is set by
 *     scripts/link-printed-edition.mjs. So the buy section is simply absent
 *     until the book is real, and appears without a deploy when it is.
 */

const PAGE_PATH = "/devotionals/beginning-of-everything";
const DEVOTIONAL_ID = "486cff66-b50e-488d-9330-3951589e6fa8";
const STUDY_PATH = `/devotionals/${DEVOTIONAL_ID}`;
/** Matches devotionals.available_from. The reader is gated by the row, not by this. */
const OPENS_ON = "2026-11-08";

function hasOpened() {
  // Compare dates, not instants: the study opens on the 1st wherever you are.
  const today = new Date().toISOString().slice(0, 10);
  return today >= OPENS_ON;
}

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
        metadata: { study: "beginning-of-everything", signed_in: Boolean(userId), ...extra },
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

export default function BeginningOfEverythingLandingPage() {
  const { userId, loading: authLoading } = useSupabaseUser();
  const [open] = useState(hasOpened);
  const [printUrl, setPrintUrl] = useState<string | null>(null);

  // The printed edition turns itself on the moment the ASIN is recorded.
  useEffect(() => {
    let cancelled = false;
    void supabase
      .from("devotionals")
      .select("paperback_url")
      .eq("id", DEVOTIONAL_ID)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled && data?.paperback_url) setPrintUrl(data.paperback_url);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const startHref = userId ? STUDY_PATH : `/signup?next=${encodeURIComponent(STUDY_PATH)}`;
  const ctaLabel = open
    ? userId
      ? "Open the study"
      : "Start Day 1 — it is free"
    : userId
      ? "You are in — opens 8 November"
      : "Save my place — it is free";

  const handleStartClick = (placement: string) => {
    markShareLandingClick(PAGE_PATH, placement);
    track("beginning_start_click", userId ?? null, { placement, destination: startHref, opened: open });
  };

  const viewTracked = useRef(false);
  useEffect(() => {
    if (authLoading || viewTracked.current) return;
    viewTracked.current = true;
    track("beginning_page_view", userId ?? null, { opened: open });
  }, [authLoading, userId, open]);

  const whatItIs = [
    {
      emoji: "📱",
      text: "It all happens inside Bible Buddy, on your phone or your computer. Nothing to print, nothing to post, nobody to meet.",
    },
    {
      emoji: "📅",
      text: "Twenty one days, one at a time. Short enough to do before work — about fifteen minutes.",
    },
    {
      emoji: "🔓",
      text: "Every day is open from the start. Go a day at a time or read three in one sitting. Nothing locks and nothing expires.",
    },
    {
      emoji: "🔁",
      text: "Miss a week and you pick up where you left off. There is no streak to break.",
    },
    {
      emoji: "📖",
      text: "You need no background. If you have never read Genesis, this is written for you first.",
    },
  ];

  const dailySteps = [
    { emoji: "📖", title: "Read the passage", text: "A short piece of Genesis, with what to watch for before you start." },
    { emoji: "🔎", title: "Read the study", text: "What is actually happening in the text, in plain language, and why it matters." },
    { emoji: "✍️", title: "Answer the question", text: "One reflection question. Your answer saves privately and only you can read it." },
    { emoji: "🙏", title: "Take the step and pray", text: "One concrete thing to do that day, and a written prayer to close it." },
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
        {open
          ? "Free forever · No card · A Bible Buddy account keeps your place private to you"
          : "Free forever · No card · Sign up now and Day 1 is waiting on 1 November"}
      </p>
      {!userId && !authLoading ? (
        <p className="mt-2 text-sm text-[#5b6c84]">
          Already have an account?{" "}
          <Link href={`/login?next=${encodeURIComponent(STUDY_PATH)}`} className="font-semibold text-[#2f6fd0] underline">
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
            src="/beginning-of-everything-cover.webp"
            alt="The Beginning of Everything — a free 21-day study of Genesis 1 to 8"
            width={1024}
            height={1535}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e4f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3f7a46]">
            {open ? "✓ Free · 21 Days · Genesis 1–8" : "Opens 8 November · Free · 21 Days"}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#10213a] sm:text-[2.6rem]">
            Before you can understand
            <br />
            the story, you have to see
            <br />
            how it began.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#44566f]">
            Twenty one days through the first eight chapters of the Bible. Creation. The garden. The
            fall. Cain and Abel. The flood. These chapters are where everything starts, and if you
            skip them the rest of the Bible is hard to follow.
          </p>
        </div>

        <div className="mt-8">{cta}</div>

        <div className="mt-10 space-y-4">
          <Section
            emoji="📖"
            title="How this study works"
            subtitle="Free, self-paced, and written for beginners"
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
          </Section>

          <Section emoji="🧭" title="What the 21 days cover" subtitle="Genesis 1 to 8, in order">
            <ol className="space-y-3 text-[15px] leading-relaxed text-[#2c3e55]">
              <li>
                <strong>Days 1–5 · The world God made.</strong> The first line of the Bible, light out
                of darkness, a world filled with life, people made in God&rsquo;s image, and the day He
                rested.
              </li>
              <li>
                <strong>Days 6–7 · The garden.</strong> The man, the ground he came from, the work he
                was given, and the first marriage.
              </li>
              <li>
                <strong>Days 8–9 · What went wrong.</strong> The question that started it, the hiding,
                and what God said and did on the worst day in history.
              </li>
              <li>
                <strong>Days 10–12 · Outside the garden.</strong> Cain and Abel, a judgment, and a
                family line that gets darker before Seth is born.
              </li>
              <li>
                <strong>Days 13–15 · From Adam to Noah.</strong> Ten generations, a world gone wrong,
                and one man told to build before there was any rain.
              </li>
              <li>
                <strong>Days 16–21 · The flood and after.</strong> Entering the ark, the waters rising,
                the God who remembered, the raven and the dove, dry ground, and an altar.
              </li>
            </ol>
          </Section>

          <Section emoji="❓" title="Common questions" subtitle="Before you start">
            <div className="space-y-4 text-[15px] leading-relaxed text-[#2c3e55]">
              <p>
                <strong>Do I need to know anything first?</strong> No. Day 1 begins by explaining what
                Genesis even is and where the name comes from.
              </p>
              <p>
                <strong>Which Bible does it use?</strong> Scripture is quoted from the King James
                Version, and the study explains the older words as they come up.
              </p>
              <p>
                <strong>Does it tell me what to believe about the age of the earth?</strong> The study
                walks through what the text says and is honest about where sincere Christians read it
                differently.
              </p>
              <p>
                <strong>What if I fall behind?</strong> Nothing resets. The day you left is the day
                waiting for you.
              </p>
            </div>
          </Section>
        </div>

        {printUrl ? (
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#dce7f7] bg-white">
            <div className="flex flex-col gap-6 px-6 py-7 sm:flex-row sm:items-center sm:px-8">
              <div className="mx-auto w-28 shrink-0 overflow-hidden rounded-xl shadow-md sm:mx-0">
                <Image
                  src="/beginning-of-everything-cover.webp"
                  alt="The Beginning of Everything in print"
                  width={1024}
                  height={1535}
                  className="h-auto w-full"
                />
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9a6b10]">
                  Prefer it in print?
                </p>
                <h2 className="mt-2 text-xl font-bold text-[#10213a]">
                  The Beginning of Everything, as a book
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-[#44566f]">
                  The same 21 days in paperback and hardcover, with room to write in it. The study here
                  stays free either way.
                </p>
                <a
                  href={printUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("beginning_book_click", userId ?? null, { destination: printUrl })}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-[#2f6fd0] px-6 py-3 text-sm font-bold text-[#2f6fd0] transition hover:bg-[#eaf1fd]"
                >
                  <span aria-hidden>📕</span>
                  See it on Amazon
                </a>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-10 rounded-3xl bg-[#10213a] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {open ? "Start at the beginning" : "It opens on 1 November"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#b9cbe4]">
            Genesis is not only telling us how the world began. It is telling us what we were made for,
            what went wrong, and what kind of God we are dealing with.
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
            <p className="mt-3 text-sm text-[#8ea7c6]">Free · No card · 21 days</p>
          </div>
        </div>
      </div>
    </main>
  );
}
