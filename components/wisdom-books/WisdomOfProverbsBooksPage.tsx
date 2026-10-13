"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import BookMockup from "./BookMockup";
import {
  WISDOM_OF_PROVERBS_PRODUCTS as PRODUCTS,
  trackWisdomBookEvent,
  type WisdomProduct,
} from "../../lib/wisdomOfProverbsProducts";

// /books/wisdom-of-proverbs - sales page for the printed editions.
// Mobile first. Hardcover is the primary product: first, largest, strongest
// button. Paperback and Journal follow as "Other ways to study".
// All product data comes from lib/wisdomOfProverbsProducts.ts. Amazon links
// open outside the app (new tab on web; in-app browser sheet in the store
// apps via components/NativeExternalLinks.tsx).

const SERIF = 'Georgia, "Times New Roman", serif';
const INK = "#1d1208";
const GOLD = "#c99a45";
const GOLD_BUTTON = "linear-gradient(180deg, #e9c678 0%, #c39037 55%, #a8772a 100%)";

type IconName = "book" | "shelf" | "heart" | "leaf" | "pen" | "gift" | "people";

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "book":
      return <svg viewBox="0 0 24 24" className={className} {...p}><path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1Z" /><path d="M12 6.5V20" /></svg>;
    case "shelf":
      return <svg viewBox="0 0 24 24" className={className} {...p}><path d="M3 20h18" /><path d="M5 20V6h3v14M9.5 20V4h3v16" /><path d="m14.5 7 3-.8 3.4 13.4-3 .8Z" /></svg>;
    case "heart":
      return <svg viewBox="0 0 24 24" className={className} {...p}><path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" /></svg>;
    case "leaf":
      return <svg viewBox="0 0 24 24" className={className} {...p}><path d="M5 19c1-8 6-13 14-14-1 8-6 13-14 14Z" /><path d="M5 19 13 11" /></svg>;
    case "pen":
      return <svg viewBox="0 0 24 24" className={className} {...p}><path d="m15 4 5 5-10 10H5v-5Z" /><path d="M13 6l5 5" /></svg>;
    case "gift":
      return <svg viewBox="0 0 24 24" className={className} {...p}><rect x="3.5" y="8" width="17" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12" /><path d="M12 8c-1.5-3.5-5-3.5-5-1.2C7 8 9.5 8 12 8Zm0 0c1.5-3.5 5-3.5 5-1.2C17 8 14.5 8 12 8Z" /></svg>;
    case "people":
      return <svg viewBox="0 0 24 24" className={className} {...p}><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.5-3.2 2.7-5 5.5-5s5 1.8 5.5 5" /><circle cx="17" cy="9" r="2.3" /><path d="M16 14.2c2.5.1 4 1.7 4.5 4.3" /></svg>;
  }
}

function AmazonCta({
  product,
  placement,
  size = "primary",
  children,
}: {
  product: WisdomProduct;
  placement: string;
  size?: "primary" | "secondary";
  children?: ReactNode;
}) {
  const label = children ?? product.ctaLabel;
  const base =
    size === "primary"
      ? "min-h-[58px] text-base sm:text-[17px]"
      : "min-h-[52px] text-[15px]";
  if (!product.amazonUrl) {
    return (
      <span
        aria-disabled="true"
        className={`flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#d3b884] px-5 text-center font-black text-[#8a6124] ${base}`}
      >
        {product.label} coming soon to Amazon
      </span>
    );
  }
  return (
    <a
      href={product.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => void trackWisdomBookEvent(product.clickEvent, { product: product.key, placement })}
      className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 font-black tracking-wide shadow-[0_10px_22px_-10px_rgba(120,76,18,0.8)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c99a45] ${base}`}
      style={size === "primary" ? { background: GOLD_BUTTON, color: INK } : { background: "#3a2410", color: "#f7ecd6" }}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function Price({ value, large = false }: { value: string; large?: boolean }) {
  return (
    <p className={`font-black tabular-nums text-[#1d1208] ${large ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{value}</p>
  );
}

function SecondaryCard({ product, variant }: { product: WisdomProduct; variant: "paperback" | "journal" }) {
  return (
    <article className="flex flex-col rounded-[26px] border border-[#e8dac0] bg-[#fffaf1] p-5 shadow-[0_18px_40px_-28px_rgba(60,35,10,0.55)] sm:p-6">
      <div className="flex items-start gap-5">
        <div className="w-[38%] max-w-[150px] flex-shrink-0">
          <BookMockup
            src={product.image}
            alt={`${product.title} ${product.edition}`}
            variant={variant === "journal" ? "hardcover" : "paperback"}
          />
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <p className="inline-block rounded-full bg-[#f1e3c6] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#7a5418]">
            {product.edition}
          </p>
          <h3 className="mt-3 text-xl font-bold leading-tight text-[#1d1208]" style={{ fontFamily: SERIF }}>
            {product.title}
          </h3>
          <div className="mt-2">
            <Price value={product.price} />
          </div>
        </div>
      </div>
      <p className="mt-4 flex-1 text-[15px] font-medium leading-7 text-[#4d3c28]">{product.description}</p>
      <div className="mt-5">
        <AmazonCta product={product} placement={`card_${product.key}`} size="secondary" />
      </div>
    </article>
  );
}

export default function WisdomOfProverbsBooksPage() {
  useEffect(() => {
    void trackWisdomBookEvent("wisdom_book_page_viewed");
  }, []);

  const hardcover = PRODUCTS.hardcover;
  const paperback = PRODUCTS.paperback;
  const journal = PRODUCTS.journal;
  // Hardcover is always featured; these follow when switched on in the config.
  const otherEditions = [paperback, journal].filter((product) => product.visible);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-28 pt-4 sm:gap-10 sm:pt-6">
      {/* 1. HERO */}
      <header
        className="relative overflow-hidden rounded-[28px] px-5 py-8 text-[#f6ecd8] sm:px-10 sm:py-12"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 10%, rgba(201,154,69,0.28) 0%, rgba(201,154,69,0) 55%), radial-gradient(80% 70% at 0% 100%, rgba(120,70,20,0.35) 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, #120b05 0%, #21150a 55%, #2d1c0c 100%)",
        }}
      >
        <div className="relative grid gap-8 md:grid-cols-[1.35fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: GOLD }}>
              The Wisdom of Proverbs
            </p>
            <h1 className="mt-3 text-[2.6rem] font-bold leading-[1.02] sm:text-6xl" style={{ fontFamily: SERIF, color: "#f6ecd8" }}>
              Take the Study
              <br />
              <span style={{ color: "#e3b964" }}>With You</span>
            </h1>
            <p className="mt-4 max-w-md text-[17px] font-medium leading-7 text-[#eadcc2]">
              Continue your journey through Proverbs away from the screen. Choose the edition that fits the way you study.
            </p>
          </div>
          <figure className="border-l-2 pl-5 md:border-l-0 md:pl-0 md:text-center" style={{ borderColor: GOLD }}>
            <blockquote className="text-2xl italic leading-snug text-[#f1dfb8] sm:text-[1.7rem]" style={{ fontFamily: SERIF }}>
              “The fear of the Lord is the beginning of wisdom.”
            </blockquote>
            <figcaption className="mt-2 text-xs font-black uppercase tracking-[0.2em]" style={{ color: GOLD }}>
              Proverbs 9:10
            </figcaption>
          </figure>
        </div>

        <ul className="relative mt-8 grid gap-4 border-t border-[#4a331a] pt-6 sm:grid-cols-3">
          {[
            ["book", "Read anytime", "Take the study beyond the screen."],
            ["shelf", "Return for years", "Keep Proverbs on your bookshelf."],
            ["heart", "Support the mission", "Help Bible Buddy reach more people with God’s Word."],
          ].map(([icon, title, body]) => (
            <li key={title} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0" style={{ color: GOLD }}>
                <Icon name={icon as IconName} className="h-7 w-7" />
              </span>
              <span>
                <span className="block text-sm font-black uppercase tracking-[0.12em] text-[#f6ecd8]">{title}</span>
                <span className="block text-sm leading-6 text-[#cdbb99]">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </header>

      {/* 2. FEATURED HARDCOVER */}
      <section
        aria-labelledby="hardcover-heading"
        className="relative overflow-hidden rounded-[30px] border-2 border-[#d9b86f] bg-gradient-to-b from-[#fffaf0] to-[#f7ecd7] p-6 shadow-[0_30px_60px_-34px_rgba(70,40,8,0.7)] sm:p-10"
      >
        <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <div className="mx-auto w-[72%] max-w-[330px] md:w-full">
            <BookMockup src={hardcover.image} alt="The Wisdom of Proverbs hardcover by Louis Moore III" variant="hardcover" />
          </div>
          <div>
            <p
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#1d1208]"
              style={{ background: GOLD_BUTTON }}
            >
              ★ Recommended Edition
            </p>
            <h2 id="hardcover-heading" className="mt-4 text-[2rem] font-bold leading-[1.05] text-[#1d1208] sm:text-5xl" style={{ fontFamily: SERIF }}>
              The Wisdom of Proverbs
              <span className="mt-1 block text-lg font-black uppercase tracking-[0.2em] text-[#8a6124] sm:text-xl" style={{ fontFamily: "inherit" }}>
                Hardcover
              </span>
            </h2>
            <div className="mt-3">
              <Price value={hardcover.price} large />
            </div>
            <p className="mt-4 text-[16px] font-medium leading-7 text-[#4d3c28]">{hardcover.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["31-Day Study", "Physical Hardcover", "Made to Keep"].map((feature) => (
                <li key={feature} className="rounded-full border border-[#e1c992] bg-white/70 px-3.5 py-1.5 text-sm font-bold text-[#5b3d14]">
                  ✓ {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <AmazonCta product={hardcover} placement="featured_hardcover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OTHER EDITIONS */}
      <section aria-labelledby="other-heading" className="flex flex-col gap-4">
        <h2 id="other-heading" className="text-center text-sm font-black uppercase tracking-[0.22em] text-[#8a6124]">
          Other ways to study
        </h2>
        <div className={otherEditions.length > 1 ? "grid gap-5 md:grid-cols-2" : "mx-auto grid w-full max-w-xl gap-5"}>
          {otherEditions.map((product) => (
            <SecondaryCard key={product.key} product={product} variant={product.key === "journal" ? "journal" : "paperback"} />
          ))}
        </div>
      </section>

      {/* 4. SCRIPTURE DIVIDER */}
      <figure className="rounded-[26px] bg-[#f4ead8] px-6 py-8 text-center">
        <blockquote className="mx-auto max-w-2xl text-xl italic leading-relaxed text-[#2b1a0b] sm:text-2xl" style={{ fontFamily: SERIF }}>
          “Apply your heart to instruction and your ears to words of knowledge.”
        </blockquote>
        <figcaption className="mt-3 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#8a6124]">
          <span className="h-px w-10 bg-[#c9ad7c]" aria-hidden="true" />
          Proverbs 23:12
          <span className="h-px w-10 bg-[#c9ad7c]" aria-hidden="true" />
        </figcaption>
      </figure>

      {/* 5. WHY OWN THE PHYSICAL EDITION */}
      <section aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-center text-2xl font-bold text-[var(--bb-text-primary,#1d1208)]" style={{ fontFamily: SERIF }}>
          Why own the physical edition?
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4">
          {[
            ["leaf", "Go deeper", "Take the study beyond the screen."],
            ["pen", "Study anywhere", "Read, highlight, write, and return whenever you want."],
            ["gift", "A meaningful gift", "Give the study to someone you want to encourage."],
            ["people", "Support the mission", "Your purchase helps support the work behind Bible Buddy."],
          ].map(([icon, title, body]) => (
            <li key={title} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4ead8] text-[#8a6124]">
                <Icon name={icon as IconName} />
              </span>
              <span className="mt-3 text-base font-black text-[var(--bb-text-primary,#1d1208)]">{title}</span>
              <span className="mt-1 text-sm leading-6 text-[var(--bb-text-secondary,#5b4a36)]">{body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. CLOSING NOTE - no second sales pitch (2026-09-23, Louis: the three
          editions at the top are the whole page). Only the free-study line
          stays, so nobody thinks the study costs money. */}
      <p className="mx-auto max-w-md border-t border-[#e8dac0] pt-6 text-center text-sm leading-6 text-[var(--bb-text-secondary,#5b4a36)]">
        The Wisdom of Proverbs community study is free inside Bible Buddy. The printed editions are optional.{" "}
        <Link href="/events/wisdom-of-proverbs" className="font-black text-[#8a6124] underline underline-offset-4">
          Join the free study
        </Link>
      </p>
    </div>
  );
}
