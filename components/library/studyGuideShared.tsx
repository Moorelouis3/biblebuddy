"use client";

import { useEffect, useState, type ReactNode } from "react";
import { trackWisdomBookEvent } from "../../lib/wisdomOfProverbsProducts";

/**
 * The pieces every Library study guide is built from.
 *
 * These are not new designs. They are the ones the Wisdom of Proverbs detail
 * page has been using since 2026-10-17, moved out of StudyDetailPage so that
 * Bible in One Year - which is a reading plan with its own tables and had its
 * own screen - renders from the same components instead of a second copy of
 * them. Louis, 2026-11-03: "wisdom of proverbs is the Template!"
 *
 * So Proverbs did not change. Everything else came to it.
 */

/**
 * A collapsed section with an icon, a title and a one-line subtitle.
 *
 * Collapsed by default on purpose: on the in-app page the reader has usually
 * already decided, so the prose sits out of the way until asked for.
 */
export function Disclosure({
  icon,
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  icon: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-[var(--bb-surface-soft,#f7faff)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
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

/**
 * "N Bible Buddies are studying X", with faces.
 *
 * The number counts people who have opened a day of this study, which is why
 * it does not match the community event page - that one counts people who
 * joined the event. Hidden below five readers entirely: "2 Bible Buddies are
 * studying this" reads worse than saying nothing.
 *
 * `readersPath` is the endpoint that answers { total, readers }. Devotionals
 * have one per study; Bible in One Year has its own, because its progress
 * lives in its own table.
 */
export function ReadersCard({
  readersPath,
  title,
}: {
  readersPath: string;
  title: string;
}) {
  const [total, setTotal] = useState<number | null>(null);
  const [readers, setReaders] = useState<Array<{ name: string; image: string | null }>>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(readersPath)
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
  }, [readersPath]);

  if (total === null || total < 5 || readers.length === 0) return null;

  // "The Wisdom of Proverbs" -> "Proverbs", so the sentence reads naturally.
  const shortTitle = title
    .replace(/^The\s+/i, "")
    .replace(
      /^(Wisdom|Tempting|Testing|Obedience|Courage|Faith|Heart|Rise|Calling|Transforming|Disciples|Promise)\s+of\s+/i,
      "",
    );

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
 * "How this Bible study works" - written from the study's own day count rather
 * than hardcoded, so a 31-day guide and a 365-day one both read correctly.
 */
export function HowItWorks({ totalDays }: { totalDays: number }) {
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

/**
 * The one Amazon button, everywhere a guide offers a printed edition.
 *
 * The gold treatment is the Amazon button the product already has, on
 * components/wisdom-books/WisdomOfProverbsBooksPage - so a reader meets the
 * same button in the Library as on the books page. The proportions are the
 * Proverbs detail page's: a full-width pill the same height as Continue
 * Studying, which is what keeps it from fighting the primary CTA.
 *
 * No URL means no button, only a line saying so. Louis, on the first cut of
 * this: "Never a broken checkout." A guide whose book is still in Amazon's
 * review queue - Bible in One Year as of 2026-11-03 - carries no link at all
 * rather than a guessed one.
 */
const AMAZON_GOLD = "linear-gradient(180deg, #e9c678 0%, #c39037 55%, #a8772a 100%)";
const AMAZON_INK = "#1d1208";

export function AmazonBookCta({
  url,
  guideTitle,
  placement,
}: {
  url: string | null;
  guideTitle: string;
  placement: string;
}) {
  if (!url) {
    return (
      <div
        aria-disabled="true"
        className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-[#d3b884] bg-[var(--bb-card,#ffffff)] px-6 py-4 text-center text-base font-black text-[#8a6124]"
      >
        <span aria-hidden>📕</span>
        Physical copy coming soon
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        void trackWisdomBookEvent("study_guide_amazon_clicked", { guide: guideTitle, placement })
      }
      className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-black tracking-wide shadow-[0_10px_22px_-10px_rgba(120,76,18,0.8)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c99a45] focus-visible:ring-offset-2"
      style={{ background: AMAZON_GOLD, color: AMAZON_INK }}
    >
      <span aria-hidden>📕</span>
      Buy the Physical Copy on Amazon
      <span aria-hidden>↗</span>
    </a>
  );
}

/** The five lines beside the cover on every guide's detail page. */
export function guideFeatures(totalDays: number): Array<[string, string]> {
  return [
    ["📘", `${totalDays} Days`],
    ["📄", "Daily readings"],
    ["💬", "Simple explanations"],
    ["🌱", "Practical application"],
    ["❤️", "Grow closer to God"],
  ];
}

/**
 * Cover, title, subtitle and the progress bar, as the study overview shows
 * them. `countLabel` is the right-hand figure - "24/31 days" - and is passed
 * in rather than derived, because what counts as done differs per guide.
 */
export function StudyProgressHeader({
  cover,
  title,
  subtitle,
  percent,
  percentLabel,
  countLabel,
}: {
  cover: string | null;
  title: string;
  subtitle: string | null;
  percent: number;
  percentLabel: string;
  countLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
      <div className="w-40 shrink-0 sm:w-44">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={`${title} cover`}
            className="aspect-[3/4] w-full rounded-2xl object-contain drop-shadow-xl"
          />
        ) : (
          <div className="grid aspect-[3/4] w-full place-items-center rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] text-5xl">
            📖
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 text-center md:text-left">
        <h1 className="mt-1 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-sm font-bold text-[var(--bb-text-secondary,#5f6368)]">{subtitle}</p>
        ) : null}

        <div className="mx-auto mt-6 w-full max-w-3xl md:mx-0">
          <div className="h-3 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#f8fbff)] shadow-inner">
            <div
              className="h-full rounded-full bg-[var(--bb-accent,#2f7fe8)] transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs font-black text-[var(--bb-text-secondary,#5f6368)]">
            <span>{percentLabel}</span>
            <span>{countLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
