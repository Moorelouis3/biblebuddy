"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { getLandingSessionId, markShareLandingClick } from "@/lib/shareLandingReferral";

/**
 * The shareable entry page for Higher Hope (2026-10-24).
 *
 * Modelled on components/proverbs/ProverbsLandingPage.tsx, which Louis named as
 * the template, with three deliberate differences:
 *
 *  1. **No community event.** Proverbs reads lib/communityEvents.ts for its copy,
 *     its member faces and its join count. Higher Hope is not a timed cohort -
 *     it is an evergreen 60 days somebody starts on the day they are ready - so
 *     it carries its own copy and depends on no event row. Nothing on this page
 *     can show a count that does not exist.
 *  2. **The subject changes the tone.** This is a study about addiction. No
 *     countdown, no "join 2,000 others", no streak language. Somebody landing
 *     here may be at the worst point of their life and is not looking to be
 *     sold to.
 *  3. **It says plainly that this is not treatment.** A devotional is not detox,
 *     therapy or medication, and the page says so rather than letting anyone
 *     infer otherwise. That line is not optional and must survive any rewrite.
 */

const PAGE_PATH = "/devotionals/higher-hope";
const DEVOTIONAL_ID = "170cb29a-39fc-47b7-9083-db1664df04f6";
const STUDY_PATH = `/devotionals/${DEVOTIONAL_ID}`;

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
        metadata: { study: "higher-hope", signed_in: Boolean(userId), ...extra },
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

export default function HigherHopeLandingPage() {
  const { userId, loading: authLoading } = useSupabaseUser();

  const startHref = userId ? STUDY_PATH : `/signup?next=${encodeURIComponent(STUDY_PATH)}`;
  const ctaLabel = userId ? "Open the study" : "Start Day 1 — it is free";

  const handleStartClick = (placement: string) => {
    markShareLandingClick(PAGE_PATH, placement);
    track("higher_hope_start_click", userId ?? null, { placement, destination: startHref });
  };

  const viewTracked = useRef(false);
  useEffect(() => {
    if (authLoading || viewTracked.current) return;
    viewTracked.current = true;
    track("higher_hope_page_view", userId ?? null);
  }, [authLoading, userId]);

  const whatItIs = [
    {
      emoji: "📱",
      text: "It all happens inside Bible Buddy, on your phone or your computer. No meetings, no Zoom, nobody to face.",
    },
    {
      emoji: "🔒",
      text: "Private. Nothing you write is shared, and nobody sees which study you are doing. You do not have to tell a single person you are here.",
    },
    {
      emoji: "📅",
      text: "Sixty days, one at a time. Short enough to do on your worst morning — about fifteen minutes.",
    },
    {
      emoji: "🔓",
      text: "All sixty days are open from the start. Begin today or in three weeks. Nothing locks, nothing expires, nothing resets if you miss a day.",
    },
    {
      emoji: "🔁",
      text: "If you stop and come back, you pick up where you left off. There is no streak to break and no penalty for starting again.",
    },
  ];

  const dailySteps = [
    { emoji: "📖", title: "Read the day", text: "A short, honest study written for where you actually are — not where you are supposed to be." },
    { emoji: "📜", title: "Read the passage", text: "The Scripture behind it, with study notes beside the text." },
    { emoji: "✍️", title: "Answer one question", text: "One reflection question. Your answer saves privately and only you can read it." },
    { emoji: "🙏", title: "Pray the prayer", text: "A written prayer for the day, for the mornings when you have no words of your own." },
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
        Free forever · No card · A Bible Buddy account keeps your place private to you
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
            src="/higher-hope.webp"
            alt="Higher Hope — a free 60-day journey through addiction with God's word"
            width={1024}
            height={1536}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e4f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3f7a46]">
            ✓ Free · 60 Days · Private
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#10213a] sm:text-[2.6rem]">
            Sixty days through
            <br />
            what has a hold on you.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#44566f]">
            For anyone fighting something they cannot put down — and for the people who love them.
            Not a programme, not a lecture, and not somebody pretending it is simple. Sixty days in
            God&rsquo;s word, one morning at a time.
          </p>
        </div>

        <div className="mt-8">{cta}</div>

        <div className="mt-10 space-y-4">
          <Section
            emoji="📖"
            title="How this study works"
            subtitle="Private, self-paced, and free — here is exactly what happens"
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
              All sixty days are open. Go at your own pace, one day at a time.
            </p>
          </Section>

          <Section
            emoji="🤝"
            title="Who this is for"
            subtitle="And who it is not for"
            defaultOpen={false}
          >
            <div className="space-y-4 text-[15px] leading-relaxed text-[#2c3e55]">
              <p>
                It is for the person who has promised themselves this is the last time, more than once.
                Alcohol, pills, porn, gambling, food, the phone, a person — the study does not assume
                which one, because the shape of it is the same.
              </p>
              <p>
                It is also for the husband, the mother, the friend who is watching somebody they love
                go under and does not know what to pray any more.
              </p>
              <p>
                It is not a recovery programme, and it does not replace one. If you are in physical
                danger, withdrawing, or thinking about ending your life, please get medical help today
                — that is the right next step, and it is not a failure of faith.
              </p>
            </div>
          </Section>

          <Section emoji="🧭" title="What the sixty days cover" subtitle="Six parts, ten days each">
            <ol className="space-y-3 text-[15px] leading-relaxed text-[#2c3e55]">
              <li>
                <strong>Days 1–10 · Telling the truth.</strong> Naming it, without excuses and without
                being crushed by it.
              </li>
              <li>
                <strong>Days 11–20 · The God who already knows.</strong> Shame, hiding, and the God who
                came looking anyway.
              </li>
              <li>
                <strong>Days 21–30 · Turning.</strong> What repentance really is, and why willpower
                alone keeps failing.
              </li>
              <li>
                <strong>Days 31–40 · Rebuilding.</strong> Triggers, habits, your body, your hours, the
                people you let near you.
              </li>
              <li>
                <strong>Days 41–50 · When you fall.</strong> Relapse, grace, and how to get up without
                starting your whole life over.
              </li>
              <li>
                <strong>Days 51–60 · A life bigger than this.</strong> Purpose, other people, and the
                long road after the crisis.
              </li>
            </ol>
          </Section>
        </div>

        <div className="mt-10 rounded-3xl border border-[#f0dcae] bg-[#fdf9ef] px-6 py-6">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#9a6b10]">Please read this</p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#2c3e55]">
            This is a Bible study, not medical care. It is not detox, therapy, medication or a
            substitute for any of them. Seeing a doctor, a counsellor or a recovery group is not weak
            faith — for a lot of people it is the exact thing God uses. If you are in crisis right
            now, contact your local emergency services or a crisis line in your country before you
            read anything else here.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-[#10213a] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Sixty days from now</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#b9cbe4]">
            you will not be a different person by magic. But you will have spent sixty mornings with
            the only one who has never once been shocked by you, and who has not moved.
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
            <p className="mt-3 text-sm text-[#8ea7c6]">Free · No card · Nobody has to know</p>
          </div>
        </div>
      </div>
    </main>
  );
}
