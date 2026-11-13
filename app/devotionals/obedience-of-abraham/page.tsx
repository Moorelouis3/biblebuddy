import type { Metadata } from "next";
import StudyShareLandingPage, { type StudyShareLandingConfig } from "@/components/library/StudyShareLandingPage";

/**
 * The shareable link for The Obedience of Abraham (2026-11-13), opening
 * 1 December. Same job as app/devotionals/beginning-of-everything/page.tsx: a
 * server component so the link carries its own Open Graph tags.
 *
 * Two things here are not optional, both learned from app/layout.tsx:
 *  - alternates.canonical, because the root canonical is pinned to the homepage,
 *    so a page that does not set its own self-canonicalises to "/".
 *  - other["og:image:secure_url"], because the root sets it to newsocialbanner.png
 *    and per-page openGraph does not replace it.
 *
 * The picture is the book cover, the same as the Beginning and Proverbs pages
 * (Louis, 2026-11-13: "use the book cover ... like beginning and wisdom were,
 * not some bg with no text").
 *
 * Everything on this page describes the BOOK: 30 days, Genesis 9 to 25. Its
 * first version, the same morning, said 15 days on Genesis 11 to 25, read off
 * an old edition that was still in the database. The cover image on file
 * says "A 28-day study" and the interior it wraps has 30 days; that one is
 * Louis's to settle.
 */

const url = "https://www.mybiblebuddy.net/devotionals/obedience-of-abraham";
const image = "https://www.mybiblebuddy.net/og/obedience-of-abraham.png";
const title = "The Obedience of Abraham | A Free 30-Day Study of Genesis 9-25";
const description =
  "Thirty days through Genesis 9 to 25. Not a character study about Abraham, a study about obedience: the call, the long wait, the covenant, Isaac, and the mountain where the Lord provided. Free and written for beginners. Opens 1 December.";
const alt = "The Obedience of Abraham — a free 30-day study of Genesis 9 to 25, from Bible Buddy";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Bible Buddy",
    type: "website",
    images: [{ url: image, width: 1200, height: 630, type: "image/png", alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
  other: {
    "og:image:secure_url": image,
    "twitter:image:alt": alt,
    // Repeated from the root layout because a page's `other` replaces it rather
    // than merging with it.
    "fb:app_id": "1293695119276480",
  },
};

const DEVOTIONAL_ID = "2c7641c1-0280-4847-b36e-e89004a58534";

const config: StudyShareLandingConfig = {
  study: "obedience-of-abraham",
  pagePath: "/devotionals/obedience-of-abraham",
  studyPath: `/devotionals/${DEVOTIONAL_ID}`,
  // Before it opens, "save my place" is the community sign-up, which is what
  // actually enrols somebody and counts them.
  beforeOpenPath: "/events/obedience-of-abraham",
  // Matches devotionals.available_from and the event's startDate.
  opensOn: "2026-12-01",
  title: "The Obedience of Abraham",
  totalDays: 30,
  passageLabel: "Genesis 9–25",
  art: {
    // devotionals.cover_image for this study, the cover the shelf shows.
    src: "/obedienceofabraham28day.png",
    width: 900,
    height: 1350,
    alt: "The Obedience of Abraham, a Bible Buddy study by Louis Moore III",
  },
  headline: ["He left home", "without knowing", "where he was going."],
  lead:
    "This is not a character study about Abraham. It is a study about obedience. Thirty days through Genesis 9 to 25. The call. The long wait. The covenant under the stars. The son who came at last. The mountain where the Lord provided.",
  howItWorks: [
    {
      emoji: "📱",
      text: "It all happens inside Bible Buddy, on your phone or your computer. Nothing to print, nothing to post, nobody to meet.",
    },
    {
      emoji: "📅",
      text: "Thirty days, one passage a day, from Genesis 9 to Genesis 25. Each day says how long its reading takes.",
    },
    {
      emoji: "🔓",
      text: "A new day opens each day from 1 to 30 December. Once a day is open it stays open.",
    },
    {
      emoji: "🔁",
      text: "Miss a few days and you pick up where you left off. There is no streak to break.",
    },
    {
      emoji: "📖",
      text: "You need no background. If you have never read Genesis, this is written for you first.",
    },
  ],
  dailySteps: [
    { emoji: "🎧", title: "Read or listen to the day", text: "What is happening in the passage, in plain language, with the older words explained." },
    { emoji: "📖", title: "Read the passage", text: "A short piece of Genesis, with what to watch for before you start." },
    { emoji: "🧠", title: "Take the trivia", text: "Five questions on what you just read." },
    { emoji: "💬", title: "Answer the question", text: "A reflection question, one thing to do that day, and a written prayer to close it." },
  ],
  coverage: {
    // Day ranges and titles are the book's own contents page.
    title: "What the 30 days cover",
    subtitle: "Genesis 9 to 25, in order",
    items: [
      {
        label: "Days 1–5 · Before Abram.",
        text: "The world starts over after the flood, Noah's failure, the family that filled the earth, the tower, and the line from Shem to Abram.",
      },
      {
        label: "Days 6–8 · The call.",
        text: "The house of Terah, the day God said get thee out, and the day Abram departed.",
      },
      {
        label: "Days 9–11 · Egypt, Lot, and war.",
        text: "A famine and a fear, what they brought back from Egypt, and Abram going to war to rescue Lot.",
      },
      {
        label: "Days 12–14 · The promise and the wait.",
        text: "The stars and the covenant, Hagar and the shortcut, and the day God set the clock.",
      },
      {
        label: "Days 15–19 · Mamre and Sodom.",
        text: "God comes to dinner, Abraham's hard questions, Lot at the gate, the judgment, and what Sodom left behind.",
      },
      {
        label: "Days 20–23 · Isaac.",
        text: "The same old fear, the laughter of Isaac's birth, the well of the oath, and the test on the mountain.",
      },
      {
        label: "Days 24–30 · The next generation.",
        text: "Saying goodbye to Sarah, a wife for Isaac, Rebekah's answer, and Abraham full of years.",
      },
    ],
  },
  questions: [
    {
      question: "Do I need to know anything first?",
      answer: "No. Day 1 starts with Noah's family walking off the ark, long before God ever spoke to Abram.",
    },
    {
      question: "Which Bible does it use?",
      answer: "Scripture is read in the King James Version, and the notes explain the older words as they come up.",
    },
    {
      question: "Do I have to keep up with everybody else?",
      answer: "No. A new day opens each day, and you can do it whenever suits you. Days you have missed stay open.",
    },
    {
      question: "Is it really free?",
      answer: "Yes. The whole study is free inside Bible Buddy.",
    },
  ],
  closing: {
    heading: "Start where Abraham started",
    text: "Abraham did not get a map. He got a promise, and he walked. These thirty days are what obeying God looked like for him over a lifetime.",
  },
};

export default function Page() {
  return <StudyShareLandingPage config={config} />;
}
