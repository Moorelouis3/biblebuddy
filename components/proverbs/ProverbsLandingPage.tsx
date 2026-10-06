"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { getCommunityEvent } from "@/lib/communityEvents";

/**
 * The permanent, shareable entry page for The Wisdom of Proverbs.
 *
 * Built 2026-10-06. Until now the only Proverbs links were /study/wisdom-of-proverbs
 * and /events/wisdom-of-proverbs. The first bounced a signed-out visitor to the
 * homepage (it redirects to /devotionals/<id>, which redirects to /dashboard,
 * which the proxy sends to "/"), and the second is a client component, so it
 * could never carry its own link preview.
 *
 * Everything shown here is real: the copy comes from lib/communityEvents.ts, and
 * the count and faces come from the two public endpoints under
 * /api/community-events/<slug>/. No invented testimonials, results or numbers.
 */

const EVENT_SLUG = "wisdom-of-proverbs";

type Member = { name: string; image: string | null };

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

export default function ProverbsLandingPage() {
  const event = getCommunityEvent(EVENT_SLUG);
  const { userId, loading: authLoading } = useSupabaseUser();
  const [joinedCount, setJoinedCount] = useState<number | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const devotionalId = event?.devotionalId ?? "";
  const studyPath = `/devotionals/${devotionalId}`;
  // Carry the destination through signup so they land in Proverbs, not a dashboard.
  // Both /signup and /login honour ?next=.
  const startHref = userId ? studyPath : `/signup?next=${encodeURIComponent(studyPath)}`;
  const ctaLabel = userId ? "Open the study" : "Start the Free 31-Day Study";

  useEffect(() => {
    let cancelled = false;
    // Neither call may block the page: a failure just hides that piece.
    fetch(`/api/community-events/${EVENT_SLUG}/count`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && typeof data?.count === "number") setJoinedCount(data.count);
      })
      .catch(() => {});
    fetch(`/api/community-events/${EVENT_SLUG}/members`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.members)) setMembers(data.members);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!event) return null;

  const howToStudy = [
    { emoji: "📖", text: "Read the chapter first. All 31, one a day — Proverbs has a chapter for every day of the month." },
    { emoji: "🧭", text: "Start at chapter 1, not chapter 10. The famous one-liners only make sense after the nine chapters of pleading that come first." },
    { emoji: "✍️", text: "Write down the one line that stung. Proverbs is not meant to be admired, it is meant to be obeyed." },
    { emoji: "🎯", text: "Pick one thing to change that day. Your words, your money, your temper — not all of it at once." },
    { emoji: "🙏", text: "Close in prayer. Wisdom in Proverbs starts with the fear of the Lord, not with cleverness." },
    { emoji: "🔁", text: "Miss a day? Carry on from where you stopped. Nothing locks and nothing expires." },
  ];

  const dailySteps = [
    { emoji: "🎧", title: "Read or listen", text: "A short study of the chapter — read it, or let Bible Buddy read it to you." },
    { emoji: "📜", title: "Read the chapter", text: "The chapter of Proverbs itself, with study notes beside the text." },
    { emoji: "🧠", title: "Take the trivia", text: "A few questions on what you just read, so it actually sticks." },
    { emoji: "💬", title: "Join the discussion", text: "Answer the day's question and see what everyone else saw in the same chapter." },
  ];

  const cta = (
    <div className="text-center">
      <Link
        href={startHref}
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
            src="/og/wisdom-of-proverbs.png"
            alt="The Wisdom of Proverbs — a free 31-day Bible study from Bible Buddy"
            width={1200}
            height={630}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e4f0e4] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3f7a46]">
            ✓ Free · 31 Days · Your own pace
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#10213a] sm:text-[2.6rem]">
            Understand Proverbs.
            <br />
            Apply God&rsquo;s wisdom to your life.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#44566f]">
            Most people never actually study Proverbs. They treat it as a drawer of loose advice — open it,
            grab a line, close it again. This takes you through all 31 chapters, one a day.
          </p>
        </div>

        <div className="mt-8">{cta}</div>

        <div className="mt-10 space-y-4">
          <Section
            emoji="🧭"
            title="How to study Proverbs"
            subtitle="Six things that change how the book reads"
            defaultOpen
          >
            <ul className="space-y-4">
              {howToStudy.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 text-lg">
                    {item.emoji}
                  </span>
                  <span className="text-[15px] leading-relaxed text-[#2c3e55]">{item.text}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section emoji="📅" title="How each day works" subtitle="Four steps, about fifteen minutes">
            <ol className="space-y-4">
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
            <p className="mt-5 rounded-2xl bg-[#f3f8ff] px-4 py-3 text-sm font-medium text-[#2c3e55]">
              {event.evergreenLine}
            </p>
          </Section>
        </div>

        {members.length > 0 ? (
          <div className="mt-10 rounded-3xl border border-[#dce7f7] bg-white px-5 py-7 sm:px-7">
            <h2 className="text-center text-lg font-bold text-[#10213a] sm:text-xl">
              {joinedCount !== null
                ? `${joinedCount.toLocaleString()} Bible Buddies are studying Proverbs`
                : "Bible Buddies studying Proverbs"}
            </h2>
            <p className="mt-1 text-center text-sm text-[#5b6c84]">You will not be doing this on your own.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-5">
              {members.map((member, index) => (
                <div key={`${member.name}-${index}`} className="flex w-16 flex-col items-center gap-1.5">
                  {member.image ? (
                    // Avatars come from many hosts, so plain <img> rather than next/image.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt=""
                      loading="lazy"
                      className="h-12 w-12 rounded-full border border-[#e3ecf8] object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf1fd] text-sm font-bold text-[#2f6fd0]">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="w-full truncate text-center text-xs text-[#5b6c84]">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 rounded-3xl bg-[#10213a] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Thirty-one days from now</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#b9cbe4]">
            you will have read every chapter of Proverbs. Not skimmed. Not collected one verse at a time.
            Read, understood, and put to work.
          </p>
          <div className="mt-7">
            <Link
              href={startHref}
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
