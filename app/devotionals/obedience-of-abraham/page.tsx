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
 * not some bg with no text"). The cover on file reads "A 28-day study of
 * Genesis 9-25" while the study is 15 days on Genesis 11 to 25, so the page
 * and the cover disagree until the cover is relettered. Louis knows.
 */

const url = "https://www.mybiblebuddy.net/devotionals/obedience-of-abraham";
const image = "https://www.mybiblebuddy.net/og/obedience-of-abraham.png";
const title = "The Obedience of Abraham | A Free 15-Day Study of Genesis 11-25";
const description =
  "Fifteen days through the life of Abraham, one chapter of Genesis a day. The call, the long wait, the covenant, Isaac, and the mountain where the Lord provided. Free and written for beginners. Opens 1 December.";
const alt = "The Obedience of Abraham — a free 15-day study of Genesis 11 to 25, from Bible Buddy";

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
  totalDays: 15,
  passageLabel: "Genesis 11–25",
  art: {
    // devotionals.cover_image for this study, the cover the shelf shows.
    src: "/obedienceofabraham28day.png",
    width: 900,
    height: 1350,
    alt: "The Obedience of Abraham, a Bible Buddy study by Louis Moore III",
  },
  headline: ["He left home", "without knowing", "where he was going."],
  lead:
    "Fifteen days through the life of Abraham, one chapter of Genesis a day. The call. The long wait. The covenant under the stars. The son who came at last. The mountain where the Lord provided.",
  howItWorks: [
    {
      emoji: "📱",
      text: "It all happens inside Bible Buddy, on your phone or your computer. Nothing to print, nothing to post, nobody to meet.",
    },
    {
      emoji: "📅",
      text: "Fifteen days, one chapter a day, from Genesis 11 to Genesis 25. About fifteen minutes each.",
    },
    {
      emoji: "🔓",
      text: "A new day opens each day from 1 to 15 December. Once a day is open it stays open.",
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
    { emoji: "🎧", title: "Read or listen to the devotional", text: "A short piece on that day's chapter and what to watch for." },
    { emoji: "📖", title: "Read the chapter", text: "One chapter of Genesis, with notes you can tap when a word or a custom is unfamiliar." },
    { emoji: "🧠", title: "Take the trivia", text: "Five questions on what you just read." },
    { emoji: "💬", title: "Answer the question", text: "One reflection question, and the discussion with everybody else reading that day." },
  ],
  coverage: {
    title: "What the 15 days cover",
    subtitle: "Genesis 11 to 25, in order",
    items: [
      {
        label: "Days 1–3 · The call.",
        text: "The family Abram came from, the day God told him to go, and the day he let Lot choose first.",
      },
      {
        label: "Days 4–5 · Courage and covenant.",
        text: "A rescue, a blessing from Melchizedek, a night under the stars, and a promise God bound Himself to.",
      },
      {
        label: "Days 6–7 · The long wait.",
        text: "Hagar and Ishmael, what happens when waiting gets dangerous, and the day Abram and Sarai were given new names.",
      },
      {
        label: "Days 8–10 · God draws near.",
        text: "Three visitors, a prayer for Sodom, mercy and judgment, and an old fear that comes back.",
      },
      {
        label: "Days 11–12 · Isaac.",
        text: "The son who came at last, and the mountain where Abraham was asked to give him back.",
      },
      {
        label: "Days 13–15 · The next generation.",
        text: "Sarah's death, a wife for Isaac, and Abraham at the end of a long life.",
      },
    ],
  },
  questions: [
    {
      question: "Do I need to know anything first?",
      answer: "No. Day 1 starts with the family Abraham came from, before God ever spoke to him.",
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
    text: "Abraham did not get a map. He got a promise, and he walked. These fifteen chapters are what trusting God looked like for him over a lifetime.",
  },
};

export default function Page() {
  return <StudyShareLandingPage config={config} />;
}
