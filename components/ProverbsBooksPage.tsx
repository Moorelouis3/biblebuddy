"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import {
  PROVERBS_BOOK_IMAGES,
  PROVERBS_JOURNAL_AMAZON_URL,
  PROVERBS_JOURNAL_COVER_IMAGE,
  PROVERBS_STUDY_GUIDE_AMAZON_URL,
  trackBooksEvent,
} from "../lib/proverbsBooks";

// The printed Wisdom of Proverbs books page. People arrive here from the
// community study, so it only explains why the PHYSICAL version exists, then
// shows the two products (Study Guide, Companion Journal) with Amazon links.
// Amazon links open in a new tab on the web and in the in-app browser sheet
// inside the store apps (components/NativeExternalLinks.tsx).

const SERIF = 'Georgia, "Times New Roman", serif';
const GOLD_BUTTON = "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)";

type IconName = "read" | "highlight" | "notes" | "keep" | "reflect" | "write" | "pray" | "remember";

function Icon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "read":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}><path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1Z" /><path d="M12 6.5V20" /></svg>;
    case "highlight":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}><path d="m14 4 6 6-9 9H5v-6Z" /><path d="M4 21h16" /></svg>;
    case "notes":
    case "write":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
    case "keep":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}><path d="M4 20h16" /><path d="M6 20V6M10 20V4M14 20V8" /><path d="m16 8 3 11" /></svg>;
    case "reflect":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}><path d="M12 21V11" /><path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6ZM12 13c0-3-2-5-6-5 0 3 2 5 6 5Z" /></svg>;
    case "pray":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}><path d="M12 3v9l-4 5v4M12 12l4 5v4" /><path d="M9 6 7 13M15 6l2 7" /></svg>;
    case "remember":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}><path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" /></svg>;
  }
}

function Benefits({ items }: { items: Array<[IconName, string]> }) {
  return (
    <ul className="mt-5 grid grid-cols-4 gap-2">
      {items.map(([icon, label]) => (
        <li key={label} className="flex flex-col items-center gap-1.5 rounded-xl bg-[#faf4e8] px-1 py-3 text-[#8a6124]">
          <Icon name={icon} />
          <span className="text-[10px] font-black tracking-[0.12em] text-[#5b3d14] sm:text-[11px]">{label}</span>
        </li>
      ))}
    </ul>
  );
}

function AmazonButton({ url, label, product, variant }: { url: string | null; label: string; product: "study_guide" | "journal"; variant: "gold" | "brown" }) {
  const style = variant === "gold" ? { background: GOLD_BUTTON, color: "#221503" } : { background: "#4a2c16", color: "#fbf3e4" };
  if (!url) {
    return (
      <p className="mt-5 flex min-h-14 w-full items-center justify-center rounded-xl border border-dashed border-[#d8c3a0] px-5 text-center text-sm font-black text-[#8a6124]">
        Amazon link coming soon
      </p>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBooksEvent("community_event_book_click", { event: "wisdom-of-proverbs", product })}
      className="mt-5 flex min-h-14 w-full items-center justify-center rounded-xl px-5 text-base font-black tracking-wide shadow-sm transition hover:brightness-95 sm:w-auto sm:min-w-[280px]"
      style={style}
    >
      {label}
    </a>
  );
}

function ProductSection({
  cover,
  eyebrow,
  heading,
  subheading,
  children,
}: {
  cover: ReactNode;
  eyebrow: string;
  heading: string;
  subheading: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-[#e6d6b8] bg-[#fffaf1] p-5 shadow-sm sm:p-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="mx-auto w-[62%] max-w-[240px] flex-shrink-0 sm:mx-0 sm:w-[38%]">{cover}</div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#a57a2c]">{eyebrow}</p>
          <h2 className="mt-1 text-[1.7rem] font-bold leading-tight text-[#2b1a0b]" style={{ fontFamily: SERIF }}>
            {heading}
          </h2>
          <p className="mt-1 text-base font-bold text-[#8a6124]">{subheading}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

function JournalCover() {
  if (PROVERBS_JOURNAL_COVER_IMAGE) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={PROVERBS_JOURNAL_COVER_IMAGE}
        alt="The Wisdom of Proverbs Journal cover"
        className="h-auto w-full rounded-md shadow-[0_14px_30px_rgba(43,26,11,0.35)]"
      />
    );
  }
  // Stand-in until the real journal cover is added (PROVERBS_JOURNAL_COVER_IMAGE).
  return (
    <div
      className="flex aspect-[2/3] w-full flex-col items-center justify-center rounded-md px-4 text-center shadow-[0_14px_30px_rgba(43,26,11,0.35)]"
      style={{ background: "linear-gradient(160deg, #5a3519 0%, #3b2210 60%, #2c190b 100%)" }}
      role="img"
      aria-label="The Wisdom of Proverbs Journal"
    >
      <p className="text-[10px] tracking-[0.3em] text-[#d9b56a]">THE</p>
      <p className="mt-1 text-xl font-bold leading-tight text-[#e8c877]" style={{ fontFamily: SERIF }}>
        Wisdom of Proverbs
      </p>
      <p className="mt-1 text-sm font-bold tracking-[0.2em] text-[#e8c877]">JOURNAL</p>
      <span className="my-4 h-px w-12 bg-[#b88f45]" />
      <p className="text-[10px] leading-4 tracking-[0.12em] text-[#d9c4a0]">31 DAYS OF REFLECTION, PRAYER, AND APPLICATION</p>
      <p className="mt-4 text-[10px] tracking-[0.2em] text-[#d9b56a]">LOUIS MOORE III</p>
    </div>
  );
}

export default function ProverbsBooksPage({ eventSlug }: { eventSlug: string }) {
  useEffect(() => {
    trackBooksEvent("community_event_books_page_view", { event: eventSlug });
  }, [eventSlug]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pb-28 pt-4">
      <Link
        href={`/events/${eventSlug}`}
        className="inline-flex w-fit items-center gap-1.5 text-sm font-black text-[var(--bb-text-secondary,#4b5563)] hover:text-[var(--bb-text-primary,#111827)]"
      >
        <span aria-hidden="true">←</span> Back to the study
      </Link>

      {/* Hero */}
      <header className="flex flex-col gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROVERBS_BOOK_IMAGES.booksPageBanner}
          alt="The Wisdom of Proverbs. More than a study, a lasting experience: a beautifully designed, easy-to-follow study you can hold, highlight, and keep forever."
          width={1774}
          height={887}
          className="h-auto w-full rounded-[24px] border border-[#3a2c14] shadow-sm"
        />
        <div className="px-1">
          <h1 className="text-[1.9rem] font-bold leading-tight text-[var(--bb-text-primary,#111827)] sm:text-4xl" style={{ fontFamily: SERIF }}>
            Some studies are better with a pen in your hand.
          </h1>
          <p className="mt-3 text-[15px] font-semibold leading-7 text-[var(--bb-text-secondary,#4b5563)]">
            The complete Wisdom of Proverbs study is available right here inside Bible Buddy. But if you would rather put
            the phone down, open your physical Bible, underline what stands out, highlight what you want to remember, and
            work through the study with a real book in your hands, we made a printed edition for you.
          </p>
          <p className="mt-3 text-[15px] font-semibold leading-7 text-[var(--bb-text-secondary,#4b5563)]">
            We took the time to turn the 31-day digital study into a physical book designed to be used, written in,
            highlighted, and kept long after the study is finished.
          </p>
        </div>
      </header>

      <ProductSection
        eyebrow="The Wisdom of Proverbs · A 31-Day Study of the Book of Proverbs"
        heading="The Study Guide"
        subheading="The study you're doing in Bible Buddy — in your hands."
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={PROVERBS_BOOK_IMAGES.studyGuideCover}
            alt="The Wisdom of Proverbs: A 31-Day Study of the Book of Proverbs, by Louis Moore III"
            width={720}
            height={1080}
            className="h-auto w-full rounded-md shadow-[0_14px_30px_rgba(43,26,11,0.35)]"
          />
        }
      >
        <p className="mt-3 text-[15px] font-semibold leading-7 text-[#5b4a36]">
          Read it beside your Bible. Underline what stands out. Highlight what you want to remember. Take notes in the
          margins. And when the 31 days are over, keep the entire journey on your bookshelf.
        </p>
        <Benefits items={[["read", "READ"], ["highlight", "HIGHLIGHT"], ["notes", "TAKE NOTES"], ["keep", "KEEP IT"]]} />
        <AmazonButton url={PROVERBS_STUDY_GUIDE_AMAZON_URL} label="Get the Study Guide on Amazon →" product="study_guide" variant="gold" />
      </ProductSection>

      <ProductSection
        eyebrow="The Wisdom of Proverbs Journal"
        heading="The Companion Journal"
        subheading="Make the study your own."
        cover={<JournalCover />}
      >
        <p className="mt-3 text-[15px] font-semibold leading-7 text-[#5b4a36]">
          The companion journal gives you a dedicated place for your answers, reflections, prayers, notes, and what God is
          teaching you throughout the 31 days.
        </p>
        <Benefits items={[["reflect", "REFLECT"], ["write", "WRITE"], ["pray", "PRAY"], ["remember", "REMEMBER"]]} />
        <AmazonButton url={PROVERBS_JOURNAL_AMAZON_URL} label="Get the Journal on Amazon →" product="journal" variant="brown" />
      </ProductSection>

      {/* Nobody has to buy anything to take part. */}
      <section className="flex gap-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-base font-black text-[#221503]"
          style={{ background: GOLD_BUTTON }}
        >
          ✓
        </span>
        <div>
          <h2 className="text-base font-black text-[var(--bb-text-primary,#111827)]">You don&apos;t need either book to participate.</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
            The complete 31-day community study remains free inside Bible Buddy. The printed books are simply there for
            Bible Buddies who prefer studying with something physical in their hands.
          </p>
          <Link
            href={`/events/${eventSlug}`}
            className="mt-3 inline-block text-sm font-black text-[var(--bb-accent,#2f7fe8)] underline"
          >
            Back to the Wisdom of Proverbs study
          </Link>
        </div>
      </section>

      <p className="text-center text-lg italic text-[var(--bb-text-muted,#6b7280)]" style={{ fontFamily: SERIF }}>
        “A quiet heart. A wiser life.”
      </p>
    </div>
  );
}
