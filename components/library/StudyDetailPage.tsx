"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import {
  availability,
  fetchProgressByStudy,
  fetchStudyById,
  withTotals,
  type LibraryStudy,
  type StudyProgress,
} from "../../lib/libraryCatalog";

/**
 * The second screen of the Library: one study guide.
 *
 * Cover and title up top, then the two CTAs, then the dropdowns. Louis,
 * 2026-10-17: "remove the what u get section, add it to the drop downs, and
 * the about this study, on all studies" - the prose used to sit open between
 * the buttons and the people, pushing everything down for a reader who had
 * already decided. It is all still here, a tap away.
 *
 * Start Studying Free uses the existing study route, so somebody already
 * enrolled is never asked to enrol again - they get Continue Studying and
 * their saved day instead.
 */
/**
 * "N Bible Buddies are studying X", with faces.
 *
 * Lifted from the public Proverbs page (components/proverbs/ProverbsLandingPage)
 * so every study in the Library gets it, not just the one with a community
 * event. The number here counts people who have opened a day, so it will not
 * match the community page's number, which counts people who joined the event.
 *
 * Hidden entirely below a handful of readers: "2 Bible Buddies are studying
 * this" reads worse than saying nothing.
 */
function ReadersCard({ studyId, title }: { studyId: string; title: string }) {
  const [total, setTotal] = useState<number | null>(null);
  const [readers, setReaders] = useState<Array<{ name: string; image: string | null }>>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/devotionals/${studyId}/readers`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setTotal(typeof data.total === "number" ? data.total : null);
        if (Array.isArray(data.readers)) setReaders(data.readers);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [studyId]);

  if (total === null || total < 5 || readers.length === 0) return null;

  // "The Wisdom of Proverbs" -> "Proverbs", so the sentence reads naturally.
  const shortTitle = title.replace(/^The\s+/i, "").replace(/^(Wisdom|Tempting|Testing|Obedience|Courage|Faith|Heart|Rise|Calling|Transforming|Disciples|Promise)\s+of\s+/i, "");

  return (
    <section className="mt-8 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-7">
      <h2 className="text-center text-lg font-black text-[var(--bb-text-primary,#111827)] sm:text-xl">
        {total.toLocaleString()} Bible Buddies are studying {shortTitle}
      </h2>
      <p className="mt-1 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
        You will not be doing this on your own.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-5">
        {readers.map((reader, index) => (
          <div key={`${reader.name}-${index}`} className="flex w-16 flex-col items-center gap-1.5">
            {reader.image ? (
              // Avatars come from many hosts, so a plain img rather than next/image.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={reader.image}
                alt=""
                loading="lazy"
                className="h-12 w-12 rounded-full border border-[var(--bb-card-border,#e3ecf8)] object-cover"
              />
            ) : (
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bb-accent-soft,#eaf1fd)] text-sm font-bold text-[var(--bb-accent,#2f7fe8)]">
                {reader.name.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="w-full truncate text-center text-xs text-[var(--bb-text-muted,#6b7280)]">
              {reader.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * "How this Bible study works" - the directions from the public Proverbs page,
 * written from the study's own numbers rather than hardcoded to 31 chapters.
 * Collapsed by default here: on the in-app page the reader has usually already
 * decided, so it sits out of the way until asked for.
 */
function Disclosure({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-[var(--bb-surface-soft,#f7faff)]"
      >
        <span aria-hidden className="text-2xl">{icon}</span>
        <span className="flex-1">
          <span className="block text-lg font-black text-[var(--bb-text-primary,#111827)]">{title}</span>
          <span className="mt-0.5 block text-sm text-[var(--bb-text-muted,#6b7280)]">{subtitle}</span>
        </span>
        <span
          aria-hidden
          className={`shrink-0 text-xl text-[var(--bb-accent,#2f7fe8)] transition-transform ${open ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </button>

      {open ? (
        <div className="border-t border-[var(--bb-card-border,#eaf1fb)] px-5 pb-7 pt-5">{children}</div>
      ) : null}
    </section>
  );
}

function HowItWorks({ totalDays }: { totalDays: number }) {
  const whatItIs = [
    ["📱", "It all happens inside Bible Buddy, on your phone or your computer. No Zoom, no video calls, no meetings to show up to."],
    ["📅", `${totalDays} days, one a day.`],
    ["⏱️", "About fifteen minutes a day, whenever suits you. Morning, lunch break, last thing at night."],
    ["🔓", `All ${totalDays} days are open from the start. Begin today or next month, go fast or slow. Nothing locks and nothing expires.`],
    ["💾", "Your place and your answers save as you go, so you can stop mid-day and pick it back up on any device."],
  ];

  const dailySteps = [
    ["🎧", "Read or listen", "A short study of the day — read it, or let Bible Buddy read it to you."],
    ["📜", "Read the passage", "The Scripture itself, with study notes beside the text."],
    ["💬", "Sit with the question", "One question about your own life, not somebody else's."],
    ["✍️", "Do the one thing, then pray", "One small, concrete action you can check off, and a prayer to close it."],
  ];

  // Only promises the app actually keeps.
  const whatYouGet = [
    `${totalDays} days of guided study`,
    "Daily Scripture and clear explanations",
    "Reflection questions",
    "Practical application for real life",
    "Track your progress in the app",
  ];

  return (
    <Disclosure
      icon="📖"
      title="How this Bible study works"
      subtitle="Digital, self-paced, and free — here is exactly what happens"
    >
          <ul className="space-y-4">
            {whatItIs.map(([icon, text]) => (
              <li key={text} className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-lg">{icon}</span>
                <span className="text-[15px] leading-relaxed text-[var(--bb-text-secondary,#2c3e55)]">{text}</span>
              </li>
            ))}
          </ul>

          <p className="mt-7 text-sm font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">
            What a day looks like
          </p>
          <ol className="mt-4 space-y-4">
            {dailySteps.map(([icon, title, text], index) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bb-accent-soft,#eaf1fd)] text-sm font-bold text-[var(--bb-accent,#2f7fe8)]">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-[var(--bb-text-primary,#111827)]">
                    <span aria-hidden className="mr-1.5">{icon}</span>
                    {title}
                  </span>
                  <span className="mt-0.5 block text-[15px] leading-relaxed text-[var(--bb-text-secondary,#44566f)]">
                    {text}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-7 text-sm font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">
            What you get
          </p>
          <ul className="mt-4 space-y-2.5">
            {whatYouGet.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[15px] font-semibold text-[var(--bb-text-primary,#111827)]"
              >
                <span aria-hidden className="mt-0.5 text-base">✅</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-2xl bg-[var(--bb-surface-soft,#f3f8ff)] px-4 py-3 text-sm font-medium text-[var(--bb-text-secondary,#2c3e55)]">
            All {totalDays} days are open. Go at your own pace, one day at a time.
          </p>
    </Disclosure>
  );
}

export default function StudyDetailPage({ studyId }: { studyId: string }) {
  const router = useRouter();
  const [study, setStudy] = useState<LibraryStudy | null>(null);
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const row = await fetchStudyById(studyId);
      if (cancelled) return;
      setStudy(row);

      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id;
      if (userId && row) {
        const all = await fetchProgressByStudy(userId);
        if (!cancelled) setProgress(withTotals(all[row.id], row.total_days));
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [studyId]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl animate-pulse px-4 py-6">
        <div className="h-5 w-24 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
        <div className="mt-5 flex gap-4">
          <div className="h-48 w-32 rounded-2xl bg-[var(--bb-surface-soft,#f1f5fa)]" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="h-6 w-3/4 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
            <div className="h-4 w-1/2 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
          </div>
        </div>
      </div>
    );
  }

  if (!study || !study.is_published) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10 text-center">
        <p className="text-base font-bold text-[var(--bb-text-primary,#111827)]">
          That study is not on the shelf.
        </p>
        <Link href="/library" className="mt-4 inline-block text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
          ← Library
        </Link>
      </div>
    );
  }

  const p = progress ?? withTotals(undefined, study.total_days);
  const started = p.completedDays > 0;
  const { comingSoon, label } = availability(study, started);

  const primaryLabel = comingSoon
    ? label ?? "Coming soon"
    : p.isComplete
      ? "Review the Study"
      : started
        ? "Continue Studying"
        : "Start Studying Free";

  /**
   * Always the study's own page, the one listing every day - never a deep link
   * into a single day. Louis, 2026-10-16: "it takes me to proverbs 8 instead of
   * the main proverbs devotional page with all the days, that's how it's done."
   * The shelf's Continue Studying card is the shortcut straight into a day;
   * this button is the way in to the study itself.
   */
  const primaryHref = `/plan?view=bible_studies&study=${encodeURIComponent(study.id)}`;

  const features: Array<[string, string]> = [
    ["📘", `${study.total_days} Days`],
    ["📄", "Daily readings"],
    ["💬", "Simple explanations"],
    ["🌱", "Practical application"],
    ["❤️", "Grow closer to God"],
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-5 md:py-8">
      <Link
        href="/library"
        className="inline-flex items-center gap-1.5 text-sm font-black text-[var(--bb-text-secondary,#5f6368)] hover:text-[var(--bb-accent,#2f7fe8)]"
      >
        ← Library
      </Link>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:gap-6">
        {study.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={study.cover_image}
            alt={study.title}
            className="mx-auto w-40 shrink-0 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] object-cover shadow-sm sm:mx-0 sm:w-44"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-3xl">
            {study.title}
          </h1>
          {study.subtitle ? (
            <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">{study.subtitle}</p>
          ) : null}
          <ul className="mt-4 space-y-2">
            {features.map(([icon, text]) => (
              <li key={text} className="flex items-center gap-2.5 text-sm font-semibold text-[var(--bb-text-primary,#111827)]">
                <span aria-hidden className="text-base">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          disabled={comingSoon}
          onClick={() => router.push(primaryHref)}
          className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-black transition ${
            comingSoon
              ? "cursor-not-allowed bg-[var(--bb-surface-soft,#f1f5fa)] text-[var(--bb-text-muted,#6b7280)]"
              : "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] shadow-lg shadow-[#2f7fe8]/20 hover:opacity-95"
          }`}
        >
          <span aria-hidden>📖</span>
          {primaryLabel}
        </button>

        {/* Never a broken checkout: without a configured URL this says so. */}
        {study.paperback_url ? (
          <a
            href={study.paperback_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-card,#ffffff)] px-6 py-4 text-base font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
          >
            <span aria-hidden>🛒</span>
            Buy the Paperback
          </a>
        ) : (
          <div className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-6 py-4 text-base font-black text-[var(--bb-text-muted,#6b7280)]">
            <span aria-hidden>🛒</span>
            Paperback coming soon
          </div>
        )}
      </div>

      <div className="mt-3">
        {study.description ? (
          <Disclosure icon="📝" title="About This Study" subtitle="What this study is, and who it is for">
            <p className="text-[15px] leading-relaxed text-[var(--bb-text-secondary,#2c3e55)]">
              {study.description}
            </p>
          </Disclosure>
        ) : null}

        <HowItWorks totalDays={study.total_days} />
      </div>

      <ReadersCard studyId={study.id} title={study.title} />
    </div>
  );
}
